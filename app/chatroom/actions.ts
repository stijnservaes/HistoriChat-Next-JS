"use server"

export async function selectRoom(prevState: {error: boolean, message: string}, formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  console.log(formData)
  return {
    error: true,
    message: "test"
  }
}