import axios from 'axios';
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'
import Form from "@/components/Form";

async function savePassword(input) {
  const request = await axios.post(
    `http://localhost:3000/api/create`,
    input,
    { headers: { 'Content-Type': 'application/json' } },
  );
}

export default async function CreateHorcrux() {
  const { userId } = auth();

  async function createFormSubmission(formData) {
    'use server'

    const rawFormData = {
      wizard: userId,
      site: formData.get('site'),
      name: formData.get('site-name'),
      username: formData.get('username'),
      password: formData.get('password'),
      note: formData.get('note') != '' ? formData.get('note') : null
    }

    // make call to api with the submitted data and save to db
    await savePassword(rawFormData)

    // finally
    redirect('/')
  }

  return (
    <div>
      <h1 className="text-2xl text-zinc-700">Add New Password</h1>
      <Form action={createFormSubmission} />
    </div>
  )
}
