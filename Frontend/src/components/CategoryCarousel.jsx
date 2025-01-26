import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const Category =[
    "Television Casting",
    "Movie Casting", 
    "Commercial Casting",
    "Stunt Performer",
    "Theater Casting",
    "Voice-Over Casting",
    "Child Actor"
]
// LOGIC YET TO ADDED what will happen onClicking these Category
const CategoryCarousel = () => {
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto y-20">
            <CarouselContent>
                {
                    Category.map((cat,index)=>(
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <Button className="rounded-full" variant="outline">{cat}</Button>

                        </CarouselItem>
                    ))
                }
               
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>

    </div>
  )
}

export default CategoryCarousel