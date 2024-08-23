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
          {/* heading with toggle */}
          <div className="flex ...">
            <div className="flex-none w-30 h-14 ...">
              <h1 className="text-2xl text-zinc-700 mb-6">All Passwords</h1>
            </div>
            <div className="grow h-14 ..."></div>
            <div className="flex-none w-30 h-14 ...">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
              </label>
            </div>
          </div>
          {condition1 ? <CardGroup passwords={data} /> : condition2 ? <Table rowData={data} /> : <p>Add passwords to your vault to view them here.</p>}
        </main>
      );
    }
    else if (out.response == 'S-01') {
      return (
        <main>
          <h1 className="text-2xl text-zinc-700 mb-6">Add passwords to your vault to see them here!</h1>
        </main>
      );
    } else {
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
