# ssm-document-converter
![npm (scoped)](https://img.shields.io/npm/v/@u-clarkdeveloper/ssm-document-converter.svg)
![GitHub](https://img.shields.io/github/license/u-clarkdeveloper/ssm-document-converter.svg)

## Installation

    $ npm install -g @u-clarkdeveloper/ssm-document-converter

## Usage

    Usage: ssm-convert [options]

    Converts AWS SSM document exported string from CLI to JSON

    Options:
    -h, --help        output usage information
    -i, --input       input file
    -o, --output      output file

## Examples

### Export document from AWS CLI

#### linux and Windows(powershell)
    aws ssm get-document --name AWS-AttachEBSVolume > ~/AWS-AttachEBSVolume.json

#### Windows(cmd.exe)
    aws ssm get-document --name AWS-AttachEBSVolume > %userprofile%/AWS-AttachEBSVolume.json

### #AWS-AttacheEBSVolume.json

    {
        "Name": "AWS-AttachEBSVolume",
        "DocumentVersion": "1",
        "Content": "{\n  \"schemaVersion\": \"0.3\", \n  \"assumeRole\": \"{{ AutomationAssumeRole }}\", \n  \"description\": \"Attach EBS Volume\", \n  \"parameters\": {\n    \"Device\": {\n      \"type\": \"String\", \n      \"description\": \"(Required) The device name (for example, /dev/sdh or xvdh )\"\n    }, \n    \"InstanceId\": {\n      \"type\": \"String\", \n      \"description\": \"(Required) The ID of the instance\"\n    },\n    \"VolumeId\": {\n      \"type\": \"String\", \n      \"description\": \"(Required) The ID of the EBS volume. The volume and instance must be within the same Availability Zone\"\n    }, \n    \"AutomationAssumeRole\": {\n      \"default\": \"\", \n      \"type\": \"String\", \n      \"description\": \"(Optional) The ARN of the role that allows Automation to perform the actions on your behalf. \"\n    }\n  }, \n  \"mainSteps\": [\n    {\n      \"action\": \"aws:createStack\", \n      \"inputs\": {\n        \"StackName\": \"AttachEBSVolumeStack{{automation:EXECUTION_ID}}\", \n        \"TemplateBody\": \"AWSTemplateFormatVersion: '2010-09-09'\\nDescription: Template to attach a EBS volume to an EC2 Instance\\nParameters:\\n  Device: {Description: 'The device name (for example, /dev/sdh or xvdh )\\n\\n      ', Type: String}\\n  InstanceId: {Description: 'The ID of the instance\\n\\n      ', Type: String}\\n  VolumeId: {Description: 'The ID of the EBS volume. The volume and instance must\\n      be within the same Availability Zone\\n\\n      ', Type: String}\\nResources:\\n  TestResource:\\n    DeletionPolicy: Retain\\n    Properties:\\n      Device: {Ref: Device}\\n      InstanceId: {Ref: InstanceId}\\n      VolumeId: {Ref: VolumeId}\\n    Type: AWS::EC2::VolumeAttachment\\n\", \n        \"Parameters\": [\n          {\n            \"ParameterValue\": \"{{Device}}\", \n            \"ParameterKey\": \"Device\"\n          }, \n          {\n            \"ParameterValue\": \"{{InstanceId}}\", \n            \"ParameterKey\": \"InstanceId\"\n          }, \n          {\n            \"ParameterValue\": \"{{VolumeId}}\", \n            \"ParameterKey\": \"VolumeId\"\n          }\n        ], \n        \"Capabilities\": [\n          \"CAPABILITY_IAM\"\n        ]\n      }, \n      \"name\": \"createDocumentStack\"\n    }, \n    {\n      \"action\": \"aws:deleteStack\", \n      \"inputs\": {\n        \"StackName\": \"AttachEBSVolumeStack{{automation:EXECUTION_ID}}\"\n      }, \n      \"name\": \"deleteCloudFormationTemplate\"\n    }\n  ]\n}\n",
        "DocumentType": "Automation",
        "DocumentFormat": "JSON"
    }

### Convert CLI export content into json
    ssm-convert -i ~/AWS-AttachEBSVolume.json -o ~/AWS-AttachEBSVolume-output.json

### #AWS-AttacheEBSVolume.json

    {
        "schemaVersion": "0.3", 
        "assumeRole": "{{ AutomationAssumeRole }}", 
        "description": "Attach EBS Volume", 
        "parameters": {
            "Device": {
            "type": "String", 
            "description": "(Required) The device name (for example, /dev/sdh or xvdh )"
            }, 
            "InstanceId": {
            "type": "String", 
            "description": "(Required) The ID of the instance"
            },
            "VolumeId": {
            "type": "String", 
            "description": "(Required) The ID of the EBS volume. The volume and instance must be within the same Availability Zone"
            }, 
            "AutomationAssumeRole": {
            "default": "", 
            "type": "String", 
            "description": "(Optional) The ARN of the role that allows Automation to perform the actions on your behalf. "
            }
        }, 
        "mainSteps": [
            {
            "action": "aws:createStack", 
            "inputs": {
                "StackName": "AttachEBSVolumeStack{{automation:EXECUTION_ID}}", 
                "TemplateBody": "AWSTemplateFormatVersion: '2010-09-09'\nDescription: Template to attach a EBS volume to an EC2 Instance\nParameters:\n  Device: {Description: 'The device name (for example, /dev/sdh or xvdh )\n\n      ', Type: String}\n  InstanceId: {Description: 'The ID of the instance\n\n      ', Type: String}\n  VolumeId: {Description: 'The ID of the EBS volume. The volume and instance must\n      be within the same Availability Zone\n\n      ', Type: String}\nResources:\n  TestResource:\n    DeletionPolicy: Retain\n    Properties:\n      Device: {Ref: Device}\n      InstanceId: {Ref: InstanceId}\n      VolumeId: {Ref: VolumeId}\n    Type: AWS::EC2::VolumeAttachment\n", 
                "Parameters": [
                {
                    "ParameterValue": "{{Device}}", 
                    "ParameterKey": "Device"
                }, 
                {
                    "ParameterValue": "{{InstanceId}}", 
                    "ParameterKey": "InstanceId"
                }, 
                {
                    "ParameterValue": "{{VolumeId}}", 
                    "ParameterKey": "VolumeId"
                }
                ], 
                "Capabilities": [
                "CAPABILITY_IAM"
                ]
            }, 
            "name": "createDocumentStack"
            }, 
            {
            "action": "aws:deleteStack", 
            "inputs": {
                "StackName": "AttachEBSVolumeStack{{automation:EXECUTION_ID}}"
            }, 
            "name": "deleteCloudFormationTemplate"
            }
        ]
    }
