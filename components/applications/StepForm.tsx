'use client';

import { useState, useEffect } from 'react';
import { ApplicationStep, ApplicationStepConfig, ApplicationStepField } from '@/types';
import { createClient } from '@/lib/supabase/client';

interface StepFormProps {
  step: ApplicationStep;
  config: ApplicationStepConfig;
  applicationId: string;
  onSave: () => void;
  onNext?: () => void;
}

export default function StepForm({ step, config, applicationId, onSave, onNext }: StepFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(step.data || {});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>(
    (step.documents || []).reduce((acc, doc) => ({ ...acc, [doc.split('/').pop()!]: doc }), {})
  );
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const supabase = createClient();

  useEffect(() => {
    setFormData(step.data || {});
    setUploadedDocs(
      (step.documents || []).reduce((acc, doc) => {
        const fileName = doc.split('/').pop() || '';
        return { ...acc, [fileName]: doc };
      }, {})
    );
  }, [step]);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (docName: string, file: File) => {
    setUploading(prev => ({ ...prev, [docName]: true }));
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${applicationId}/${step.step_name}/${docName}_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('application-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('application-documents')
        .getPublicUrl(fileName);

      setUploadedDocs(prev => ({ ...prev, [docName]: publicUrl }));
      setSuccess(`${docName} uploaded successfully!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(`Failed to upload ${docName}: ${err.message}`);
    } finally {
      setUploading(prev => ({ ...prev, [docName]: false }));
    }
  };

  const validateForm = (): boolean => {
    for (const field of config.fields) {
      if (field.required && (!formData[field.name] || formData[field.name].trim() === '')) {
        setError(`${field.label} is required`);
        return false;
      }

      if (field.name.includes('summary') || field.name.includes('motivation')) {
        const minLength = field.name.includes('motivation') ? 200 : 100;
        if (formData[field.name] && formData[field.name].length < minLength) {
          setError(`${field.label} must be at least ${minLength} characters`);
          return false;
        }
      }

      if (field.name.includes('career_goals')) {
        const minLength = 100;
        if (formData[field.name] && formData[field.name].length < minLength) {
          setError(`${field.label} must be at least ${minLength} characters`);
          return false;
        }
      }
    }

    for (const doc of config.documents) {
      if (doc.required && !uploadedDocs[doc.name]) {
        setError(`${doc.label} is required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent, markComplete: boolean = false) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const status = markComplete ? 'completed' : 'in_progress';
      const documents = Object.values(uploadedDocs).filter(Boolean);

      const { error: updateError } = await supabase
        .from('application_steps')
        .update({
          data: formData,
          documents,
          status,
          completed_at: markComplete ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', step.id);

      if (updateError) throw updateError;

      if (markComplete) {
        const { error: appUpdateError } = await supabase
          .from('applications')
          .update({
            current_step: Math.min(step.step_number + 1, 7),
            updated_at: new Date().toISOString(),
          })
          .eq('id', applicationId);

        if (appUpdateError) throw appUpdateError;
      }

      setSuccess(markComplete ? 'Step completed successfully!' : 'Progress saved!');
      setTimeout(() => setSuccess(''), 3000);
      onSave();

      if (markComplete && onNext && step.step_number < 7) {
        setTimeout(() => onNext(), 1000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save step');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: ApplicationStepField) => {
    const value = formData[field.name] || '';

    const baseInputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent";

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            placeholder={field.placeholder}
            rows={6}
            className={baseInputClass}
          />
        );

      case 'select':
        return (
          <select
            id={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className={baseInputClass}
          >
            <option value="">Select...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'date':
        return (
          <input
            type="date"
            id={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className={baseInputClass}
          />
        );

      case 'tel':
        return (
          <input
            type="tel"
            id={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            id={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            id={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        );

      default:
        return (
          <input
            type="text"
            id={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            placeholder={field.placeholder}
            className={baseInputClass}
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h2>
        <p className="text-gray-600">{config.description}</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        {config.fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && <span className="text-red-600">*</span>}
            </label>
            {renderField(field)}
            {field.helperText && (
              <p className="mt-1 text-sm text-gray-500">{field.helperText}</p>
            )}
            {(field.name.includes('summary') || field.name.includes('motivation') || field.name.includes('career_goals')) && (
              <p className="mt-1 text-sm text-gray-500">
                Characters: {(formData[field.name] || '').length}
              </p>
            )}
          </div>
        ))}

        {config.documents && config.documents.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
            <div className="space-y-4">
              {config.documents.map((doc) => (
                <div key={doc.name} className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {doc.label} {doc.required && <span className="text-red-600">*</span>}
                  </label>
                  <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                  
                  {uploadedDocs[doc.name] ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded p-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-green-800">Document uploaded</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedDocs(prev => ({ ...prev, [doc.name]: '' }))}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept={doc.acceptedFormats.join(',')}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > doc.maxSize * 1024 * 1024) {
                            setError(`File size must be less than ${doc.maxSize}MB`);
                            return;
                          }
                          handleFileUpload(doc.name, file);
                        }
                      }}
                      disabled={uploading[doc.name]}
                      className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                  )}
                  {uploading[doc.name] && (
                    <p className="mt-2 text-sm text-blue-600">Uploading...</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Progress'}
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : step.step_number === 7 ? 'Submit Application' : 'Complete & Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
