FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY *.sln .
COPY trayvio.API/*.csproj trayvio.API/
COPY trayvio.Application/*.csproj trayvio.Application/
COPY trayvio.Domain/*.csproj trayvio.Domain/
COPY trayvio.Infrastructure/*.csproj trayvio.Infrastructure/

# Restore dependencies
RUN dotnet restore

# Copy everything else
COPY . .

# Publish API project
RUN dotnet publish trayvio.API/trayvio.API.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "trayvio.API.dll"]
