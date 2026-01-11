# ---------- BUILD ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy everything
COPY . .

# restore only the API project
RUN dotnet restore Trayvio.API/Trayvio.API.csproj

# publish API
RUN dotnet publish Trayvio.API/Trayvio.API.csproj -c Release -o /app/publish

# ---------- RUNTIME ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Trayvio.API.dll"]
