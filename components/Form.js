"use client"

import React, { useState, useEffect } from 'react'
import { Button, Label, TextInput, Textarea } from "flowbite-react";

export default function Form({ action }) {
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        setRendered(true)
    }, []);

    if (rendered) {
        return (
            <form className="flex max-w-md flex-col gap-4 my-6" action={action}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="site" value="Site URL" />
                        </div>
                        <TextInput
                            name="site"
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="site-name" value="Site Name" />
                        </div>
                        <TextInput
                            name="site-name"
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="Username" />
                        </div>
                        <TextInput
                            name="username"
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput
                            name="password"
                            type="password"
                            required
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="note" value="Personal Note" />
                    </div>
                    <Textarea
                        name="note"
                        type="text"
                        rows={4}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        )
    } else {
        return (
            <div className='my-6'>
                Loading...
            </div>
        )
    }
}
