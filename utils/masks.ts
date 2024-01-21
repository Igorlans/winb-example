export type Masks = 'time' | 'phone'

function maskTime(value: string) {
    // Remove non-digit characters and limit the input to 5 characters
    value = value.replace(/\D/g, "").substring(0, 4);

    if (value.length > 2) {
        // Insert ":" after the first two digits if there are more than two digits
        value = value.substring(0, 2) + ":" + value.substring(2);
    }

    return value;
}

export const phoneRegex = /^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;

const formatStringWithMask = (value: string, mask: string) => {
    let maskedValue = '';
    let maskIndex = 0;

    for (let i = 0; i < value.length && maskIndex < mask.length; i++) {
        if (mask[maskIndex] === '9') {
            // Allow only numeric characters
            if (/\d/.test(value[i])) {
                maskedValue += value[i];
                maskIndex++;
            } else {
                // Skip non-numeric characters in input
            }
        } else {
            // Use the mask character as is
            maskedValue += mask[maskIndex];
            maskIndex++;
        }
    }

    // Fill in any remaining mask characters if needed
    while (maskIndex < mask.length) {
        if (mask[maskIndex] === '9') {
            maskedValue += ' ';
        } else {
            maskedValue += mask[maskIndex];
        }
        maskIndex++;
    }

    return maskedValue;
};

function maskPhone(value: string) {
    const cleanedInput = value.replace(/\D/g, '');

    // Ensure "380" is always at the beginning
    let formattedValue = cleanedInput.startsWith('380') ? '380' : '';

    // Apply the format mask to the cleaned input
    let inputIndex = 0;

    const formatMask = [
        '+',
        '3',
        '8',
        '0',
        ' ',
        '(',
        '_',
        '_',
        ')',
        ' ',
        '_',
        '_',
        '_',
        '-',
        '_',
        '_',
        '-',
        '_',
    ];

    for (let maskIndex = 0; maskIndex < formatMask.length; maskIndex++) {
        if (formatMask[maskIndex] === '_') {
            if (cleanedInput[inputIndex]) {
                formattedValue += cleanedInput[inputIndex];
                inputIndex++;
            } else {
                break; // Stop adding characters once we run out of input digits
            }
        } else {
            formattedValue += formatMask[maskIndex];
        }
    }

    return formattedValue;
}

export const maskValue = (value: string, mask: Masks) => {
    switch (mask) {
        case "time":
            return maskTime(value)
        case "phone":
            return maskPhone(value)
        default:
            return maskTime(value)
    }
}



