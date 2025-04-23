@echo off
REM HII qovlugunu yarat ve ora kec
mkdir HII 
cd HII 

REM Yeni bir solyusiya yarat
dotnet new sln

REM ASP.NET Core 7.0 ile yeni API layihe yarat
dotnet new webapi -o API --framework net7.0

REM API layihəsini solyusiyaya əlavə et
dotnet sln add API

REM Core və Infrastructure layihələrini yarat
dotnet new classlib -o Core --framework net7.0
dotnet new classlib -o Infrastructure --framework net7.0

REM Layihələri solyusiyaya əlavə et
dotnet sln add Core
dotnet sln add Infrastructure

REM Referansları əlavə et
cd API
dotnet add reference ../Infrastructure
cd ..
cd Infrastructure
dotnet add reference ../Core

REM Layihəni bərpa və qur
cd ..
dotnet restore
dotnet build

REM Iş bitdikden sonra mesaj çap et
echo Layiheler ugurla yaradildi ve 7.0 ile quruldu.
pause
