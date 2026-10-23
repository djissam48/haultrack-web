'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createShipment(formData: FormData) {
  try {
    // Kanjbdou l'ma3loumat mn l'formulaire
    const origin = formData.get('origin') as string;
    const destination = formData.get('destination') as string;
    const client = formData.get('client') as string;
    const amount = formData.get('amount') as string;

    // Kan-creew l'expédition f Database
    await prisma.shipment.create({
      data: {
        shipmentId: `SHP-${Math.floor(1000 + Math.random() * 9000)}`, // kay-creer ID b7al SHP-1234
        client: client,
        origin: origin,
        destination: destination,
        status: 'En attente', // Statut par défaut
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
        amount: `${amount} MAD`,
      },
    });

    // Kan-golo l'Next.js y3awd y-chargi l'page dyal l'historique bach tban fih l'expédition jdida
    revalidatePath('/expeditions');
    
    return { success: true };
  } catch (error) {
    console.error("Erreur f l'ajout d'expédition:", error);
    return { success: false, error: "Mochkil f système" };
  }
}