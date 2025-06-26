using AutoMapper;
using Trayvio.Application.Commands.FoodItems;
using Trayvio.Application.Commands.Menus;
using Trayvio.Application.Commands.Users;
using Trayvio.Application.Commands.Vendors;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Entities;

namespace Trayvio.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateFoodItemCommand, FoodItem>();
        CreateMap<CreateVendorCommand, Vendor>();
        CreateMap<CreateUserCommand, User>();
        CreateMap<CreateMenuCommand, Menu>();
        CreateMap<SignupCommand, User>();
        CreateMap<LoginCommand, User>();

        CreateMap<FoodItem, FoodItemDto>();
        CreateMap<Vendor, VendorDto>();
        CreateMap<User, UserDto>();
        CreateMap<CustomerProfile, CustomerProfileDto>();
        CreateMap<VendorStaff, VendorStaffDto>();
        CreateMap<Reservation, ReservationDto>();
        CreateMap<Menu, MenuDto>();
        CreateMap<MenuFoodItem, MenuFoodItemDto>();
        CreateMap<SignupDto, User>();
        CreateMap<LoginDto, User>();
        // // MappingProfile.cs
        // CreateMap<FoodItem, FoodItemDto>()
        //     .ForMember(
        //         dest => dest.Vendor,
        //         opt => opt.MapFrom(src => src.Vendor != null ? src.Vendor : new Vendor())
        //     );
        // CreateMap<Vendor, VendorDto>()
        //     .ForMember(
        //         dest => dest.FoodItems,
        //         opt => opt.MapFrom(src => src.FoodItems ?? new List<FoodItem>())
        //     );
        // CreateMap<User, UserDto>()
        //     .ForMember(
        //         dest => dest.CustomerProfile,
        //         opt => opt.MapFrom(src => src.CustomerProfile ?? new CustomerProfile())
        //     );
    }
}
