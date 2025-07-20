import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;
  const vendorId = data.get('vendorId');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    // Generate a unique filename
    const extension = path.extname(file.name);
    const filename = `${uuidv4()}${extension}`;
    
    // Define the upload directory (relative to project root)
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'fooditems');
    
    
    // Read the file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Write the file to the filesystem
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    
    // Return the public URL path
    const publicPath = `/images/fooditems/${filename}`;
    
    return NextResponse.json({ path: publicPath });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}