---
layout: post
title: "Importing Terraform Resources and Using AI"
date: 2025-09-27 10:00:00 -0700
tags:
- terraform
- ai
- devops
- infrastructure
---

# Importing Terraform Resources and Using AI

<!--more-->

## Introduction

When working with existing AWS infrastructure that needs to be brought under Terraform management, the import process can be complex and error-prone. This is especially true when working with sophisticated modules like CloudPosse's VPC and dynamic subnets modules, where you need to import multiple interconnected resources while maintaining proper state management.

This post demonstrates how AI can streamline the process of importing AWS network resources into Terraform, specifically for use with the CloudPosse VPC and dynamic_subnets modules.

## AWS Resource Import Helper

I need to import an existing AWS resource into my OpenTofu/Terraform configuration. I have a resource definition from `terraform plan` output that shows what will be created, but the resource already exists in AWS.

### Prerequisites - Ask the User First!

Before starting the import process, the assistant must ask the user for the following information:

1. **AWS Profile**: What AWS CLI profile should be used? (e.g., `default`, `dev`, `prod-admin`)
2. **Terraform File Location**: Where is your Terraform/OpenTofu configuration file? (most commonly `main.tf` or path to specific `.tf` file)
3. **AWS Region**: Which AWS region are your resources in? (e.g., `us-east-1`, `us-west-2`, `eu-west-1`)
4. **Resource Definition**: Please paste the resource definition from your `terraform plan` output

**Do not proceed with any AWS CLI commands or import operations until you have collected this information from the user.**

### Task

Please help me:

1. Find the existing AWS resource ID using the AWS CLI with the `--profile [MY_AWS_PROFILE]` flag
2. Get the correct import syntax for the resource type from the Terraform AWS provider documentation
3. Add the proper import block to my configuration file

### Process

After collecting the prerequisite information, the assistant will:

1. **Extract resource attributes** from the terraform plan output (CIDR blocks, availability zones, VPC IDs, tags, etc.)
2. **Query AWS CLI** using `--profile [USER_PROFILE] --region [USER_REGION]` with appropriate filters to find the existing resource ID
3. **Reference Terraform documentation** using Context7 to get the correct import syntax for the resource type
4. **Add import block** to the user's configuration file using the format:
   ```terraform
   import {
     to = [RESOURCE_ADDRESS]
     id = "[RESOURCE_ID]"
   }
   ```

### Common AWS CLI Query Patterns Used

#### Subnets

```bash
aws ec2 describe-subnets --profile [MY_AWS_PROFILE] --region us-east-1 \
  --filters "Name=cidr-block,Values=[CIDR]" \
            "Name=availability-zone,Values=[AZ]" \
            "Name=vpc-id,Values=[VPC_ID]" \
  --query 'Subnets[0].SubnetId' --output text
```

#### Security Groups

```bash
aws ec2 describe-security-groups --profile [MY_AWS_PROFILE] --region us-east-1 \
  --filters "Name=vpc-id,Values=[VPC_ID]" \
            "Name=group-name,Values=default" \
  --query 'SecurityGroups[0].GroupId' --output text
```

#### VPC Resources

```bash
aws ec2 describe-vpcs --profile [MY_AWS_PROFILE] --region us-east-1 \
  --filters "Name=tag:Name,Values=[TAG_NAME]" \
  --query 'Vpcs[0].VpcId' --output text
```

#### Route Tables

```bash
aws ec2 describe-route-tables --profile [MY_AWS_PROFILE] --region us-east-1 \
  --filters "Name=vpc-id,Values=[VPC_ID]" \
            "Name=tag:Name,Values=[TAG_NAME]" \
  --query 'RouteTables[0].RouteTableId' --output text
```

#### NAT Gateways

```bash
aws ec2 describe-nat-gateways --profile [MY_AWS_PROFILE] --region us-east-1 \
  --filters "Name=vpc-id,Values=[VPC_ID]" \
            "Name=state,Values=available" \
  --query 'NatGateways[0].NatGatewayId' --output text
```

#### Internet Gateways

```bash
aws ec2 describe-internet-gateways --profile [MY_AWS_PROFILE] --region us-east-1 \
  --filters "Name=attachment.vpc-id,Values=[VPC_ID]" \
  --query 'InternetGateways[0].InternetGatewayId' --output text
```

#### Elastic IPs

```bash
aws ec2 describe-addresses --profile [MY_AWS_PROFILE] --region us-east-1 \
  --filters "Name=tag:Name,Values=[TAG_NAME]" \
  --query 'Addresses[0].AllocationId' --output text
```

#### Network ACLs

```bash
aws ec2 describe-network-acls --profile [MY_AWS_PROFILE] --region us-east-1 \
  --filters "Name=vpc-id,Values=[VPC_ID]" \
            "Name=tag:Name,Values=[TAG_NAME]" \
  --query 'NetworkAcls[0].NetworkAclId' --output text
```

### Usage Instructions

1. **Start by asking the user** for the four prerequisite pieces of information listed above
2. **Verify AWS CLI access** by confirming the profile exists and has appropriate permissions
3. **Use the provided information** to customize all AWS CLI commands with the correct profile and region
4. **Add import blocks** to the user's specified configuration file location

### Additional Questions to Consider

Depending on the resource type, you may also want to ask:

5. **Module vs Direct Resource**: Is this resource part of a Terraform module or a direct resource? (affects the `to` address in import blocks)
6. **Workspace/Environment**: Are you working in a specific Terraform workspace? (may affect resource naming or tags)
7. **Backup Confirmation**: Do you want me to show you the import blocks before adding them to your file?

### Notes

- Always verify AWS CLI is configured with the specified profile before running commands
- Use resource attributes (CIDR blocks, AZs, VPC IDs, tags) to uniquely identify existing resources
- Import blocks use the modern Terraform v1.5.0+ syntax
- Each import is added as a separate block for clarity and maintainability
- Test with `terraform plan` after imports to verify they worked correctly

## Conclusion

By combining AI assistance with systematic AWS CLI queries and proper Terraform import syntax, the process of importing complex network infrastructure becomes much more manageable. This approach is particularly valuable when working with CloudPosse modules, where the module abstraction can make resource addresses less obvious.