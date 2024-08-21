import React from 'react'
import axios from 'axios';
import { auth } from "@clerk/nextjs/server";
import Table from '@/components/Table'

export default async function TableView() {
  const { userId } = auth();

  async function getPasswords(input) {
    const endpoint = `http://localhost:3000/api/findAll`
    const config = { headers: { 'Content-Type': 'application/json' } }
    const request = await axios.post(endpoint, input, config);
    return request.data
  }

  if (userId) {
    const res = await getPasswords({ collectionName: userId })
    const data = res.response;
    let condition = data.length > 0

    return (
      <div>
        <h1 className="text-2xl text-zinc-700 mb-4">Table View</h1>
        {condition ? <Table rowData={data} /> : <div className='my-6'>Loading...</div>}
      </div>
    )
  }
}
