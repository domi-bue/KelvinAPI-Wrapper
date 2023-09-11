# Kelvin API Wrapper
A wrapper for the [Kelvin-API](https://www.univention.com/products/app-catalog/ucsschool-kelvin-rest-api/) from [UCS@School](https://www.univention.com/products/app-catalog/ucsschool/)

## Installation
```bash
npm install kelvin-api-wrapper
```

## Usage
```js
import KelvinAPI from "kelvin-api-wrapper"

const api = new KelvinAPI({
    FQDN: "your.ucs-server.com",
    token: "your-api-token"
});

api.Users.getAll()
  .then(users => {
    console.log(users);
  })
  .catch(error => {
    console.error(error);
  });
```

## Features

- **Convenient API Wrapper:** Simplify your interactions with the Kelvin API by using a convenient and intuitive wrapper.
- **Authentication Options:** Authenticate seamlessly using either API tokens or username and password credentials.
- **Streamlined Endpoint Interaction:** Easily interact with various API endpoints without dealing with low-level implementation details.
- **TypeScript Support:** Enjoy a seamless development experience with built-in TypeScript type definitions for enhanced code quality and development productivity.

## Code of Conduct

We expect all contributors to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a respectful and inclusive environment.

## Contributing

Interested in contributing to Kelvin API Wrapper? Please read our [Contribution Guidelines](CONTRIBUTING.md) for information on how to get started.

## Security

We take security seriously at Kelvin API Wrapper. If you discover a security vulnerability, please follow our [security policy](SECURITY.md) to report it responsibly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.