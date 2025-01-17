import axios from 'axios';
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'
import FormCard from '@/components/FormCard';
import { getEndpoint } from "@/lib/endpoint";

async function updateOrDeletePassword(input, action) {
    const fullUrl = action == 'edit' ? `${getEndpoint(process.env.PRODUCTION)}/edit` : `${getEndpoint(process.env.PRODUCTION)}/delete`
    const request = await axios.post(
        fullUrl,
        input,
        { headers: { 'Content-Type': 'application/json' } },
    );
}

export default async function UpdateHorcrux({ params }) {
    const { userId } = auth();

    async function getPassword(input) {
        const endpoint = `${getEndpoint(process.env.PRODUCTION)}/findOne`
        const config = { headers: { 'Content-Type': 'application/json' } }
        const request = await axios.post(endpoint, input, config);
        return request.data
    }

    async function createFormSubmission(formData) {
        'use server'

        await updateOrDeletePassword({
            wizard: userId,
            cloak: params.id,
            site: formData.get('site'),
            name: formData.get('site-name'),
            username: formData.get('username'),
            password: formData.get('password'),
            note: formData.get('note') != '' ? formData.get('note') : null
        }, 'edit')
        redirect(`/`)
    }

    async function passwordDeletionAction(formData) {
        'use server'

        await updateOrDeletePassword({
            wizard: userId,
            cloak: params.id,
        }, 'delete')
        redirect(`/`)
    }

    if (userId) {
        const res = await getPassword({ collectionName: userId, id: params.id });
        const { site, name, username, note, password } = res.response;

        return (
            <div>
                <FormCard
                    site={site}
                    name={name}
                    username={username}
                    password={password}
                    note={note}
                    submitAction={createFormSubmission}
                    deleteAction={passwordDeletionAction}
                />
            </div>
        )
    }
}