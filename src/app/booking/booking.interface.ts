export interface BookingFormData {
    name: string;
    surname: string;
    phone: string;
    reason: string;
    description?: string;
    consultDate: Date;
    consultTime: Date;
    email: string;
    contactMethod: string;
    referral?: string;
    referralCode?: string;
    userDevice: string;
}