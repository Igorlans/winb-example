"use client";
import { CldUploadWidget } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    onFieldRemove?: () => void
    value: string[];
    imageClassName?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
                                                    disabled,
                                                    onChange,
                                                    onRemove,
                                                    onFieldRemove,
                                                    value,
                                                    imageClassName
                                                }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4 flex-wrap">
                {value.map((url) => (
                    <div key={url} className={cn("relative w-[200px] h-[200px] rounded-md overflow-hidden shrink-0", imageClassName)}>
                        <div className="z-10 absolute top-2 right-2">
                            <Button disabled={disabled} type="button" onClick={() => {
                                onRemove(url)
                                if (onFieldRemove) onFieldRemove()
                            }} variant="destructive" size="sm">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} >
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    if (value.length) return <></>
                    
                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Завантажити фото
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;