"use client"

import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const ModelsShowcase = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes())
      emblaApi.plugins().autoplay.play
    }
  }, [emblaApi])

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('models')
      .select('*')
      .range(0, 20)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="gap-4 p-4 mt-4 w-full embla select-none" ref={emblaRef}>
      {loading && (<p className="text-center text-xs justify-center flex mx-auto items-center">Loading...</p>)}
      {!loading && (
        <div className="grid grid-rows-1 grid-flow-col overflow-visible gap-4 embla__container">
          {data?.map((item: any) => (
            <div key={item.id} className="first:pl-4 embla__slide">
              <img 
                src={`https://cjtfqzjfdimgpvpwhzlv.supabase.co/storage/v1/object/public/Images/${item.id}.webp`}  
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/favicon.ico'; 
                }}
                alt={item.name} 
                className="h-full object-cover object-top rounded-3xl mb-2 bg-white/10" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelsShowcase;
