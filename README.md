# Enonic XP starter template for Visual Studio with Typescript 

This template contains what you need to create an Enonic XP project in Visual studio.

It is based on the [Enonic XP app starter kit with support for TypeScript](https://github.com/enonic/starter-typescript), however i have also created definition files for the XP lib ("xp/portal", "xp/content", etc) and added gradlew deploy in the build step. 

The build process is: 
1) Compile typescript files  
2) Build and deploy the application with gradle.

## Usage

You can either download the project and rename it or you can download the templates and add them to Visual studio.

You can change the XP_HOME location for your project by changing the Enonic.Gradle.targets file located under build/vs/gradle. The default is (SolutionDir)home.

## Templates

In the template folder you can find a project template, three item templates and some resharper templates. The project template contains the actual project, the item templates contains templates for Enonic content types, pages and parts.

The defualt Visual Studio template location should be \Users[Current user]\Documents\Visual Studio xxxx\Templates[ProjectTemplates or ItemTemplates]\TypeScript

The resharper templates contains templates for adding Enonic page, part and layout typescript controllers with html files.

## Other 

Don’t add xml files using visual studio (Add --> New Item --> XML File), this will add an XML with UTF-8-BOM encoding witch Enonic XP does not support (use the item templates to add create xml files for content types, pages and parts).
