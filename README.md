# Password Storage Demo Application

This Node.js application demonstrates the difference between secure and insecure password storage methods. It's designed as an educational tool for developers to understand the importance of proper password hashing techniques.

## Table of Contents

1. [Setup and Installation](#setup-and-installation)
2. [Running the Application](#running-the-application)
3. [API Endpoints](#api-endpoints)
4. [Secure vs Insecure Password Storage](#secure-vs-insecure-password-storage)
5. [Cracking SHA-1 Hashes](#cracking-sha-1-hashes)
6. [Important Security Note](#important-security-note)

## Setup and Installation

1. Ensure you have Docker installed on your system.
2. Clone this repository:
   ```
   git clone https://github.com/your-repo/password-storage-demo.git
   cd password-storage-demo
   ```
3. Build the Docker image:
   ```
   docker build -t password-storage-demo .
   ```

## Running the Application

Run the container:

```
docker run -p 8880:8880 password-storage-demo
```

The application will be accessible at `http://localhost:8880`.

## API Endpoints

1. **Sign Up**: `POST /signup`
   - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "secretpassword" }`
   - Creates a new user with hashed password

2. **List Users**: `GET /users`
   - Returns a list of all users with their hashed passwords

3. **Toggle Security Mode**: `POST /toggle-mode`
   - Switches between secure (bcrypt) and insecure (SHA-1) password hashing

## Secure vs Insecure Password Storage

### Insecure Method (SHA-1)

```javascript
function insecureHash(password) {
    return crypto.createHash('sha1').update(password).digest('hex');
}
```

This method uses SHA-1, which is fast to compute and vulnerable to rainbow table attacks.

### Secure Method (bcrypt)

```javascript
async function secureHash(password) {
    const saltRounds = 12; // Strong work factor
    return await bcrypt.hash(password, saltRounds);
}
```

This method uses bcrypt, which is slow by design and includes a salt, making it resistant to rainbow table attacks.

## Cracking SHA-1 Hashes

To demonstrate the vulnerability of SHA-1:

1. Sign up a user in insecure mode.
2. Retrieve the SHA-1 hash from the `/users` endpoint.
3. Go to [CrackStation](https://crackstation.net/).
4. Paste the SHA-1 hash and observe how quickly it can be cracked.

## Important Security Note

**Caution**: This application intentionally returns hashed passwords in API responses to demonstrate the vulnerability of insecure hashing methods. In real-world applications, this is a severe security risk and should never be done. Passwords, even when hashed, should never be sent to the client or stored in easily accessible locations.

The purpose of this demo is solely educational, to showcase the differences between secure and insecure password storage methods. In production environments, always follow security best practices:

1. Never store plain-text passwords.
2. Use strong, adaptive hashing algorithms like bcrypt, Argon2, or PBKDF2.
3. Never return password hashes in API responses.
4. Implement proper authentication and authorization mechanisms.
5. Use HTTPS for all communications involving sensitive data.

Remember, security is crucial in real-world applications. Always prioritize the protection of user data and follow the latest security best practices in your projects.