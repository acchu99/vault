import axios from 'axios';
import { auth, currentUser } from "@clerk/nextjs/server";
import HomeView from '@/components/HomeView';
import { getEndpoint } from "@/lib/endpoint";

export default async function Home() {
  const { userId } = auth();

  async function setUser(input) {
    const endpoint = getEndpoint(process.env.PRODUCTION);
    const config = { headers: { 'Content-Type': 'application/json' } };
    const request = await axios.post(endpoint, input, config);
    return request.data
  }

  async function getPasswords(input) {
    const endpoint = `${getEndpoint(process.env.PRODUCTION)}/findAll`;
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

      return (
        <main>
          {/* heading with toggle */}
          <HomeView data={data} />
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
