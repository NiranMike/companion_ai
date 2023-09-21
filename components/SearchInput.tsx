"use client"
import qs from 'query-string';
import {ChangeEventHandler, useEffect, useState} from 'react'
import { PiMagnifyingGlassBold } from "react-icons/pi";
import {Input} from "@/components/ui/input";
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from '@/hooks/useDebounce';

const SearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");
    const name = searchParams.get("name");

    const [value, setValue] = useState(name || "");
    const debouncedValue = useDebounce<string>(value, 500);
    
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setValue(e.target.value)
    }
    
    useEffect(() => {
      const query = {
        name: debouncedValue,
        categoryId
      };
      const url = qs.stringifyUrl({
        url: window.location.href,
        query,
      }, { skipEmptyString: true, skipNull: true, });

      router.push(url);
    },[debouncedValue,router,categoryId])
  return (
    <div className="relative flex items-center">
        <PiMagnifyingGlassBold size={18} className="absolute top-3 left-4 text-muted-foreground" />
        <Input 
         onChange={onChange}
         value={value}
         placeholder="Search..."
         className="pl-10 bg-primary/10"
        />
    </div>
  )
}

export default SearchInput