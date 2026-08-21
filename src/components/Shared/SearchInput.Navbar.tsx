import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ButtonGroup } from "../ui/button-group"

export function SearchInputNavbar() {
    return (
        <Field>
            {/* <FieldLabel htmlFor="input-button-group">Search</FieldLabel> */}
            <ButtonGroup>
                <Input id="input-button-group" placeholder="Type to search..." />
                <Button variant="outline">Search</Button>
            </ButtonGroup>
        </Field>
    )
}
