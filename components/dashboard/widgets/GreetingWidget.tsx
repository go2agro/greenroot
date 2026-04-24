'use client';

interface GreetingWidgetProps {
  username?: string;
}

export default function GreetingWidget({ username = 'Student' }: GreetingWidgetProps) {
  return (
    <div className="w-full mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome, {username}!
      </h1>
      <p className="text-lg text-gray-600">
        Your journey to internships start here, let's get you placed!
      </p>
    </div>
  );
}
