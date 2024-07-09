using AutoMapper;
using MyVideoGamesStoreAPI.DTOs;
using MyVideoGamesStoreAPI.Models;

namespace MyVideoGamesStoreAPI.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
        }
    }
}