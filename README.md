# MOBIS_COS4CLOUD
![monocle_logo](https://cos4cloud-eosc.eu/wp-content/uploads/2020/07/logo-cos4cloud-middle.png)


# MOBIS FRONT END SUPPORT PACKAGE


# What is MOBIS?


## Introduction
Mobis is a citizen science platform that enables app developers and researchers to incorporate air and water quality monitoring, as well as biodiversity research, into their own apps. The software includes example integrations with Canair.io, mini-secchi, iSPEX and Plant*Net, which are tools for measuring air and water quality and studying biodiversity, respectively. 
Mobis also includes features for user login and storage on the European Open Science Cloud. This makes it easy for researchers and app developers to collect and share data for their projects.


# About this repository

Here you will find software and documentation for our low cost sensors (iSPEX, kDUINO, Fresh Water Watch)
The software is developed using the IONIC framework, Parse Server (Back End). 
For iSPEX(r) we offer a basic interface. The iSPEX (r) professional software is using native closed source software and developed outside the EU research project. 


Mobis is an open source citizen science software framework that allows app developers and researchers to easily integrate air and water quality monitoring, as well as biodiversity research, into their own apps. 
The sample software includes integrations with Canair.io (for air quality), mini-secchi (for water quality), and Plant*Net (for biodiversity research), as well as user login and storage on the European Open Science Cloud.

This readme acts as a reference for the mobis  software and / or documentation. Both software and documentation are still into development, so the contents of this file/wiki can and will change over time.


## Audience
Scientists,  (app) developers,  project partners, people who are lookikng for low cost sensor integration solutions.

## Documentation
More in depth documentation is available on ZENODO: https://zenodo.org/record/7615472#.Y-JidC8w2gQ

## Generic
Provided functionalities in R 1.0: 
User login (Apple/Google/Email)
Language switcher
Data sync/upload

WIP:
Full offline support (Parse Server)
Push notifications

# Plugin description
### General description

## CANAIR.IO
### Description 

## MINI SECCHI
### Description of the mobis Mini Secchi Plugin
Mini Secchi is a water quality tool that measures the Secchi depth of a lake or river. This is a measure of the water transparency and is used to assess water quality. The Mini Secchi is a low-cost, open-source sensor that can be used to collect water quality data in lakes, rivers and streams.

## iSPEX
### Description of the mobis iSPEX spectropolarimeter Plugin

iSPEX is a spectropolarimeter that measures the optical properties of water or air. It is a low-cost, open-source sensor that can be used to collect water quality data in lakes, rivers and streams. 


##  Description of the mobis PLANT*NET API plugin
### Description 
Plant*Net is a platformfor plant identification
that allows users to identify plants using a smartphone camera.

# BACK END SCRIPTS

Mobile back end. Used for storage, metadata, push notifications, offline sync.
Parse Server 

### Parse Server setup
You can run your own (Dockerized) Parse Server or use the Cos4Cloud instance. 
If you want to run your own instance, please check the [Parse Server documentation](https://docs.parseplatform.org/parse-server/guide/). 
If you want to use the Cos4Cloud instance, please contact us via the [Cos4Cloud Slack channel](https://join.slack.com/t/cos4cloud/shared_invite/zt-8q3vzq1p-7b3hGdYk8jvRyRJd1Nn9gg). 


### Sensor Things API 1.1 support
The Cos4Cloud instance of Parse Server supports the Sensor Things API 1.1. 
Please check the [Sensor Things API 1.1 documentation](https://developers.sensorup.com/docs/#section/Introduction) for more information.

# FUNDING

![EU_logo](https://cos4cloud-eosc.eu/wp-content/uploads/2020/07/logo-eu.png)

This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 863463



