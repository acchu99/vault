"use client";

import React, { useState, useEffect } from 'react'
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import { checkPasswordStrength, generatePassword } from "@/lib/password"

export default function DemoForm({ formSubmission }) {
    const [rendered, setRendered] = useState(false);
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState('')

    const [passwordLength, setPasswordLength] = useState(8);
    const [lowerCase, setLowerCase] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [specialChars, setSpecialChars] = useState(false);

    useEffect(() => {
        setRendered(true)
    }, []);

    const showHandler = () => { setShow(!show) }

    const passwordChangeHandler = (e) => {
        const newPass = password + e.target.value
        setPassword()
    }

    const generatePasswordHandler = () => {
        console.log(passwordLength,lowerCase,upperCase,numbers,specialChars)
        const genPass = generatePassword(passwordLength,upperCase,lowerCase,numbers,specialChars)
        setPassword(genPass)
    }

    if (rendered) {
        return (
            <Card className="w-full">
                <form className="flex flex-col gap-4" action={formSubmission}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="url" value="URL" />
                            </div>
                            <TextInput
                                id="url"
                                name="site"
                                type="url"
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
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
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
                                    />
                                </div>
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
                                        value={password}
                                        onChange={passwordChangeHandler}
                                        type={show ? "text" : "password"}
                                    />
                                </div>
                                <Button color="gray" type='button' onClick={showHandler}>{show ? "Hide" : "Show"}</Button>
                            </div>
                            <div className='grid grid-cols-6 gap-4 mt-1'>
                                {/* password length */}
                                <input 
                                    type="number" 
                                    id="number-input" 
                                    aria-describedby="helper-text-explanation" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    defaultValue={passwordLength} 
                                    onChange={(e)=>{setPasswordLength(e.target.value)}}
                                    min={8} max={64} 
                                />
                                {/* lower case */}
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={lowerCase} onChange={
                                        (e)=>{
                                            setLowerCase(!lowerCase)
                                            console.log(lowerCase)
                                        }
                                    } className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Lower Case</span>
                                </label>
                                {/* upper case */}
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={upperCase} onChange={(e)=>{setUpperCase(!upperCase)}} className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Upper Case</span>
                                </label>
                                {/* numbers */}
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={numbers} onChange={(e)=>{setNumbers(!numbers)}} className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Number (0-9)</span>
                                </label>
                                {/* special chars */}
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={specialChars} onChange={(e)=>{setSpecialChars(!specialChars)}} className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Special Chars</span>
                                </label>
                                <Button color="gray" type='button' onClick={generatePasswordHandler}>Generate Password</Button>
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
                            rows={4}
                        />
                    </div>
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
