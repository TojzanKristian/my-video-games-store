using AutoMapper;
using MyVideoGamesStoreAPI.DTOs;
using MyVideoGamesStoreAPI.Models;

namespace MyVideoGamesStoreAPI.Mappings
{
    public class VideoGameProfile : Profile
    {
        public VideoGameProfile()
        {
            CreateMap<VideoGame, HomePageVideoGameDto>();
            CreateMap<VideoGame, DetailsVideoGameDto>();
        }
    }
}