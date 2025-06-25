import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
        "https://iysgivrfihhmwgjcatka.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5c2dpdnJmaWhobXdnamNhdGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODUyNTEsImV4cCI6MjA2NjM2MTI1MX0.Jxh2CdeBA4dUFqLcxn8R3tK7w1yza9HwKcphUX0XuQs"
    );
export default function mediaUpload(file) {
    const promise = new Promise(
        (resolve, reject) => {
            if(file == null) {
                reject("No file selected");
            }
            const timeStamp = new Date().getTime();
            const newFileName = timeStamp + file.name;

            supabase.storage.from("images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false,
            }).then(
                () => {
                    const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl;
                    resolve(url);
                }
            ).catch(
                (error) => {
                    console.log(error);
                    reject("File upload failed");
                }
            )
        }
    )

    return promise;
}
