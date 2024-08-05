import jsonwebtoken from "jsonwebtoken";

function verifyJwtToken(request, response, next) {
    const authHeader = request.headers.authorization || request.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) return response.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    jsonwebtoken.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if(error) return response.status(403).json({ error: "Unauthorized" });

            request.user = decoded.username;
            request.role = decoded.role;

            next();
        }
    );
}

export default verifyJwtToken;