"use client"
import Image from 'next/image';
import bioData from '@/data/bio-service.json';
import { ContentSection } from '@/components/types';

export default function Bio() {
    const { sectionClass, containerClass, rowClass, colClass, content } = bioData as ContentSection;
    return (
        <section className={sectionClass}>
            <div className={containerClass}>
                <div className={rowClass}>
                    <div className={colClass}>
                        <div className={content.class}>
                            <h2 dangerouslySetInnerHTML={{ __html: content.title }} />
                            {content.images?.map((image, index) => (
                                <div key={index} className={image.class}>
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={400}
                                        height={300}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}