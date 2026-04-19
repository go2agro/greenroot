import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { internship_id } = await request.json();

    if (!internship_id) {
      return NextResponse.json({ error: 'Internship ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('saved_internships')
      .insert({
        student_id: user.id,
        internship_id,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Internship already saved' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error saving internship:', error);
    return NextResponse.json({ error: 'Failed to save internship' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const internship_id = searchParams.get('internship_id');

    if (!internship_id) {
      return NextResponse.json({ error: 'Internship ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('saved_internships')
      .delete()
      .eq('student_id', user.id)
      .eq('internship_id', internship_id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing saved internship:', error);
    return NextResponse.json({ error: 'Failed to remove saved internship' }, { status: 500 });
  }
}
