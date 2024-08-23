"use client"
import React, { useState } from 'react'
import CardGroup from '@/components/CardGroup';
import Table from '@/components/Table';
import { ToggleSwitch } from "flowbite-react";

export default function HomeView({ data }) {
    const [cardView, setCardView] = useState(false);

    const viewChangeHandler = () => {
        setCardView(!cardView)
    }

    return (
        <div>
            <div className="flex ...">
                <div className="flex-none w-30 h-14 ...">
                    <h1 className="text-2xl text-zinc-700 mb-6">Your Passwords</h1>
                </div>
                <div className="grow h-14 ..."></div>
                <div className="flex-none w-30 h-14 ...">
                    <label className="inline-flex items-center cursor-pointer">
                        <ToggleSwitch checked={cardView} label={`Toggle View (${cardView?'Cards':'Table'})`} onChange={viewChangeHandler} />
                    </label>
                </div>
            </div>
            {data.length > 0 && cardView ? <CardGroup passwords={data} /> : data.length > 0 && !cardView?<Table rowData={data} />:<p>Add passwords to your vault to view them here.</p>}
        </div>
    )
}
