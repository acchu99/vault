import axios from 'axios';
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'
import Form from "@/components/Form";
import { getEndpoint } from "@/lib/endpoint";
import { getRequiredEnvVar } from "@/lib/getEnv"

async function savePassword(input) {
  let endpoint = `${getEndpoint(getRequiredEnvVar("NODE_ENV"))}/create`;
  const request = await axios.post(
    endpoint,
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
      <Form action={createFormSubmission} />
    </div>
  )
}
