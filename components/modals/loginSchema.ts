import { z } from "zod"
import { useTranslations } from "next-intl";

const schema = z.object({
    id: z.string(),
    name: z.string().nonempty("Поле обов'язкове"),
    phone: z.string().nonempty("Поле обов'язкове").regex(/^\+\d{1,3}\s\(\d{2,3}\)\s\d{3}-\d{2}-\d{2}$/, 'Введіть коректний номер'),
    email: z.string().nonempty("Поле обов'язкове").email('Введіть коректний email'),
})

export default function useLoginFormSchema() {
    const v = useTranslations("validation")
    const loginFormSchema = z.object({
        id: z.string(),
        name: z.string().min(1, v("field")),
        phone: z.string().min(1, v("field")).regex(/^\+\d{1,3}\s\(\d{2,3}\)\s\d{3}-\d{2}-\d{2}$/, v("phone")),
        email: z.string().min(1, v("field")).email(v("email")),
    })

    return {
        loginFormSchema
    }
}
export type LoginFormValues = z.infer<typeof schema>