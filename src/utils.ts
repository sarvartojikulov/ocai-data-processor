export async function parseJsonFile<T>(file : File) : Promise<T> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => resolve(JSON.parse(event.target!.result as string) as T);
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
    });
}
