﻿using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Book, BookDto>()
                .ForMember(x => x.BookAuthor, o => o.MapFrom(s => s.Author.FullName))
                .ForMember(x => x.BookCategory, o => o.MapFrom(s => s.Category.Name))
                .ForMember(x => x.BookType, o => o.MapFrom(s => s.Type.Name))
                .ForMember(x => x.Photo, o => o.MapFrom<BookUrlResolver>());
            CreateMap<Home, HomeDto>()
                .ForMember(x => x.Photo, o => o.MapFrom<HomeUrlResolver>());

            CreateMap<Core.Entities.Type, TypeDto>()
                .ForMember(x => x.TypeName, o => o.MapFrom(s => s.Name));

        
        }    
    }
}
