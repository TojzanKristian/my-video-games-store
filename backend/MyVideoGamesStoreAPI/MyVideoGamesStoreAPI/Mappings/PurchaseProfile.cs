using AutoMapper;
using MyVideoGamesStoreAPI.DTOs;
using MyVideoGamesStoreAPI.Models;

namespace MyVideoGamesStoreAPI.Mappings
{
    public class PurchaseProfile : Profile
    {
        public PurchaseProfile()
        {
            CreateMap<Purchase, PurchaseDto>();
        }
    }
}