# Hide and Seek

Hide and Seek is an encrypting/decrypting application for files using XOR, also users may include CRC. After that users are able to download the encrypted/decrypted application.

## Technologies

Backend side of the application was created in Microsoft Visual Studio 2022 with C# (.net 6).
For the client side I used Visual Studio Code with react and css.

## Installation

If you clone/copy this GitHub Repository then you need to:
1. Make sure your computer is set up properly

    Install Microsoft Visual Studio 2022.

    I recommend you use Visual Studio Code (VSCode) to run the React command scripts. You will need to:
        Install VSCode
        Install proper Node.js if not already loaded.
        Type ```node --version``` to check if nodejs is already installed.

2. Set up the specific project

    Open HideAndSeek/API.

    Use command ```dotnet restore``` in terminal (CTRL + ` ) for installing Nugget Packages.
    
    In Microsoft Visual Studio right click on HideAndSeek.csproj and select 'Set as Startup Project'.

    Execute the project.
3. Running the development server

    Open hide-and-seek (client side of the application) in Visual Studio Code. Run in terminal(CTRL + ` ) ```npm install``` to install the npm packages. 
    
    Run in terminal ```npm start``` to start the development server.

## Usage

Users have to upload a file, type the key (must be a hex key) for the encryption/decryption and choose the operation to execute : encrypt / decrypt. Also for de encrypt is available the option of adding CRC. The upload button appears only if all fields are completed. After clicking Upload button the file encrypted/decrypted is available for download. Press the Download button to save the file.
