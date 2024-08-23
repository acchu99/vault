import Link from 'next/link'

export default function Card({ id, name, site, username, note }) {
    return (
        <Link
            href={`/${id}`}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">URL:</span> {site}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">Username:</span> {username}</p>
            {note!==null && <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">Personal Note:</span> {note}</p>}
        </Link>
    )
}
