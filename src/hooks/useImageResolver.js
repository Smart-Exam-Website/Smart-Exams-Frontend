const useImageResolver = () => {
    return (imageName) => {
        if (imageName?.includes("http")) return imageName
        return 'https://smart-exam.s3.eu-central-1.amazonaws.com/uploads/' + imageName
    }
}

export default useImageResolver
