const useImageResolver = () => {
    return (imageName) => {
        if (imageName?.includes("http")) return imageName
        return 'https://smartexamwebsite.s3.us-east-2.amazonaws.com/uploads/' + imageName
    }
}

export default useImageResolver
