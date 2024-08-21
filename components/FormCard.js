"use client";

import React, { useState, useEffect } from 'react'
import { Button, Card, Label, TextInput, Textarea, ToggleSwitch, Clipboard, Popover } from "flowbite-react";

const clipboardClassName = "rounded-l-none rounded-r-rg"

export default function FormCard({ site, name, username, password, note, submitAction, deleteAction }) {
    const [rendered, setRendered] = useState(false);
    const [edit, setEdit] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setRendered(true)
    }, []);

    const editHandler = () => { setEdit(!edit) }
    const showHandler = () => { setShow(!show) }

    if (rendered) {
        return (
            <Card className="w-full">
                <ToggleSwitch checked={edit} label="Edit Form" onChange={editHandler} />
                <form className="flex flex-col gap-4" action={submitAction}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="url" value="URL" />
                            </div>
                            <TextInput
                                id="url"
                                name="site"
                                type="url"
                                defaultValue={site}
                                readOnly={edit ? false : true}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name" />
                            </div>
                            <TextInput
                                id="name"
                                name="site-name"
                                type="text"
                                defaultValue={name}
                                readOnly={edit ? false : true}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username" value="Username" />
                            </div>
                            <div className='flex gap-4'>
                                <div className="w-full">
                                    <TextInput
                                        id="username"
                                        name="username"
                                        type="text"
                                        defaultValue={username}
                                        readOnly={edit ? false : true} />
                                </div>
                                <Clipboard
                                    type='button'
                                    valueToCopy={username}
                                    label="Copy"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Password" />
                            </div>
                            <div className='flex gap-4'>
                                <div className='w-full'>
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type={show ? "text" : "password"}
                                        defaultValue={password}
                                        readOnly={edit ? false : true}
                                        disabled={edit ? false : true}
                                    />
                                </div>
                                <Button.Group>
                                    <Button color="gray" type='button' onClick={showHandler}>{show ? "Hide" : "Show"}</Button>
                                    <Clipboard
                                        className={clipboardClassName}
                                        type='button'
                                        valueToCopy={password}
                                        label="Copy"
                                    />
                                </Button.Group>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="note" value="Personal Note" />
                        </div>
                        <Textarea
                            name="note"
                            type="text"
                            defaultValue={note}
                            rows={4}
                            readOnly={edit ? false : true}
                        />
                    </div>
                    {edit && (
                        <div className='flex gap-2'>
                            <Button type="submit">Save</Button>
                            <Popover
                                aria-labelledby="default-popover"
                                content={
                                    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                            <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">Are you sure you want to delete this password?</h3>
                                        </div>
                                        <div className="px-3 py-2">
                                            <p>This action can't be reversed! </p>
                                            <Button
                                                type="reset"
                                                className='my-5'
                                                color="failure"
                                                onClick={() => deleteAction()}
                                            >
                                                Confirm Delete
                                            </Button>
                                        </div>
                                    </div>
                                }
                                arrow={false}
                            >
                                <Button type="button" color="warning">Delete</Button>
                            </Popover>
                        </div>
                    )}
                </form>
            </Card>
        )
    } else {
        return (
            <div className='my-6'>
                Loading...
            </div>
        )
    }
}

/*
group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10focus:outline-none :ring-cyan-700border border-gray-200 bg-white text-gray-900focus:text-cyan-700 enabled:hover:bg-gray-100enabled:hover:text-cyan-700dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white rounded-lg rounded-l-none border-l-0 pl-0 focus:ring-2
*/