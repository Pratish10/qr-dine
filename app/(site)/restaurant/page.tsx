import { RestaurantForm } from '@/components/restaurant-form'
import { useCurrentSession } from '@/hooks/useCurrentSession'

const Restaurant = async (): Promise<JSX.Element> => {
    const user = await useCurrentSession()
    // @ts-expect-error using ts-ignore beacuse of the isTwoEnabled property
    return <RestaurantForm user={user} />
}

export default Restaurant
