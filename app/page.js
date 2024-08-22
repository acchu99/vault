import axios from 'axios';
import { auth, currentUser } from "@clerk/nextjs/server";
import CardGroup from '@/components/CardGroup';
import Table from '@/components/Table';

export default async function Home() {
  const { userId } = auth();

  async function setUser(input) {
    const endpoint = `http://localhost:3000/api`;
    const config = { headers: { 'Content-Type': 'application/json' } };
    const request = await axios.post(endpoint, input, config);
    return request.data
  }

  async function getPasswords(input) {
    const endpoint = `http://localhost:3000/api/findAll`
    const config = { headers: { 'Content-Type': 'application/json' } }
    const request = await axios.post(endpoint, input, config);
    return request.data
  }

  if (userId) {
    const { id, primaryEmailAddressId, primaryPhoneNumberId } = await currentUser();
    const out = await setUser({ id1: id, id2: primaryEmailAddressId, id3: primaryPhoneNumberId });

    if (out.response == 'S-02') {
      const res = await getPasswords({ collectionName: userId });
      const data = res.response;

      const overflowLength = 2
      const condition1 = data.length > 0 && data.length <= overflowLength
      const condition2 = data.length > overflowLength

      return (
        <main>
          <h1 className="text-2xl text-zinc-700 mb-6">All Passwords</h1>
          {condition1 ? <CardGroup passwords={data} /> : condition2 ? <Table rowData={data} /> :<p>Add passwords to your vault to view them here.</p>}
        </main>
      );
    }
    else if (out.response == 'S-01') {
      return (
        <main>
          <h1 className="text-2xl text-zinc-700 mb-6">Add passwords to your vault to see them here!</h1>
        </main>
      );
    }else{
      return (
        <main>
          <h1 className="text-2xl text-zinc-700 mb-6">Error Occurred</h1>
        </main>
      );
    }
  } else {
    return (
      <main>
        <h1 className="text-2xl text-zinc-700 mb-6">Sign in to view dashboard</h1>
      </main>
    )
  }
}
