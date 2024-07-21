import './index.css'
import { InputText } from 'primereact/inputtext'
import { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { FileUpload, FileUploadHandlerParam } from 'primereact/fileupload';
import Service from './service'
import IntDataUsers from './interfaces'
import { AxiosResponse } from 'axios'

interface NavBarProps {
    onSearched: (data: IntDataUsers[]) => void
}

const NavBar: React.FC<NavBarProps> = ({ onSearched }) => {
    const [query, setQuery] = useState<string>('')
    const service = new Service()
    const fileUploadRef = useRef<FileUpload>(null)

    const onUpload = async (event: FileUploadHandlerParam) => {
        const file = event.files[0]

        if (file && file.type === 'text/csv') {
            try {
                const formData = new FormData()
                formData.append('file', file)

                await service.postFile(formData)
                toast.success('Your file has been uploaded successfully!')
                
                if (fileUploadRef.current) {
                    fileUploadRef.current.clear()
                }
            } catch (error) {
                toast.error('Failed to upload file.')
            }
        } else {
            toast.error('Please upload a valid CSV file.')
        }
    }

    const searchUsers = (query: string) => {
        setTimeout(() => {
            service.searchUsers(query).then(
                ({ data }: AxiosResponse<IntDataUsers[]>) => onSearched(data),
                () => {
                    toast.error("Error in search users!")
                }
            )
        }, 300)
    }

    return (
        <nav className="navbar">
            <InputText
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    searchUsers(e.target.value)
                }}
                placeholder="Search"
            />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <FileUpload
                ref={fileUploadRef}
                auto
                className="ml-2"
                mode="basic"
                name="Up File"
                accept=".csv"
                customUpload
                uploadHandler={onUpload}
            />
        </nav>
    )
}

export default NavBar
