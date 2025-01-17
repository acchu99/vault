function getRequiredEnvVar(varName) {
    const value = process.env[varName];
    if (value === undefined) {
        throw new Error(`Environment variable ${varName} is not set.`);
    }
    return value;
}

export {
    getRequiredEnvVar
}