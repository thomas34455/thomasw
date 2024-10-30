// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstate {
    struct Property {
        string name;
        string location;
        uint256 price;
        bool isSold;
    }

    Property[] public properties;

    function addProperty(string memory _name, string memory _location, uint256 _price) public {
        properties.push(Property(_name, _location, _price, false));
    }

    function updateProperty(uint256 index, uint256 newPrice) public {
        require(index < properties.length, "Property index out of bounds");
        properties[index].price = newPrice;
    }

    function removeProperty(uint256 index) public {
        require(index < properties.length, "Property index out of bounds");
        properties[index] = properties[properties.length - 1];
        properties.pop();
    }

    function markAsSold(uint256 index) public {
        require(index < properties.length, "Property index out of bounds");
        properties[index].isSold = true;
    }

    function propertyCount() public view returns (uint256) {
        return properties.length;
    }

    function getProperty(uint256 index) public view returns (string memory, string memory, uint256, bool) {
        require(index < properties.length, "Property index out of bounds");
        Property memory property = properties[index];
        return (property.name, property.location, property.price, property.isSold);
    }
}
