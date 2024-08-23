"use client";

import React, { useState, useEffect } from 'react'
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import { checkPasswordStrength, generatePassword } from "@/lib/password"

export default function Form({ action }) {
    const [rendered, setRendered] = useState(false);
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState('')

    const [passwordLength, setPasswordLength] = useState(8);
    const [lowerCase, setLowerCase] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [specialChars, setSpecialChars] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');

    useEffect(() => {
        setRendered(true)
    }, []);

    const showHandler = () => { setShow(!show) }

    const passwordChangeHandler = (e) => {
        const currentPassword = e.target.value
        setPassword(currentPassword)

        if(currentPassword.length>0){
            setPasswordStrength(checkPasswordStrength(currentPassword))
        }else{
            setPasswordStrength('')
        }
    }
    
    const generatePasswordHandler = () => {
        const generated = generatePassword(passwordLength, upperCase, lowerCase, numbers, specialChars)
        setPassword(generated)
        setPasswordStrength(checkPasswordStrength(generated))
    }

    if (rendered) {
        return (
            <Card className="w-full">
                <form className="flex flex-col gap-4" action={action}>
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
                                <Button color="gray" type='button' onClick={generatePasswordHandler}>Generate</Button>
                            </div>
                            <div className='grid grid-cols-6 gap-4 mt-2'>
                                {/* password length */}
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="password_length"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        defaultValue={passwordLength}
                                        onChange={(e) => { setPasswordLength(e.target.value) }}
                                        min={8} max={64}
                                    />
                                    <label
                                        for="password_length"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    >
                                        Password Length
                                    </label>
                                </div>
                                {/* lower case */}
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={lowerCase} onChange={
                                        (e) => {
                                            setLowerCase(!lowerCase)
                                            console.log(lowerCase)
                                        }
                                    } className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Lower Case</span>
                                </label>
                                {/* upper case */}
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={upperCase} onChange={(e) => { setUpperCase(!upperCase) }} className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Upper Case</span>
                                </label>
                                {/* numbers */}
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={numbers} onChange={(e) => { setNumbers(!numbers) }} className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Number (0-9)</span>
                                </label>
                                {/* special chars */}
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={specialChars} onChange={(e) => { setSpecialChars(!specialChars) }} className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Special Chars</span>
                                </label>
                                {/* strength */}
                                <div className="relative z-0">
                                    <input 
                                        type="text" 
                                        id="password_strength" 
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  
                                        disabled
                                        value={passwordStrength}
                                    />
                                    <label 
                                        for="password_strength" 
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                                    >
                                        Strength
                                    </label>
                                </div>
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
                    <div>
                        <Button className='w-full' type="submit">Submit</Button>
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
