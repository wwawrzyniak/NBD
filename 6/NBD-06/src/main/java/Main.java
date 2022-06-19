import com.basho.riak.client.api.RiakClient;
import com.basho.riak.client.api.commands.kv.DeleteValue;
import com.basho.riak.client.api.commands.kv.FetchValue;
import com.basho.riak.client.api.commands.kv.StoreValue;
import com.basho.riak.client.api.commands.kv.UpdateValue;
import com.basho.riak.client.core.RiakCluster;
import com.basho.riak.client.core.RiakNode;
import com.basho.riak.client.core.query.Location;
import com.basho.riak.client.core.query.Namespace;
import org.apache.log4j.BasicConfigurator;

public class Main {

    public static class Store {
        public String name;
        public String address;

        @Override
        public String toString() {
            return "Store{" +
                    "name='" + name + '\'' +
                    ", address='" + address + '\'' +
                    '}';
        }
    }

    public static class StoreUpdate extends UpdateValue.Update<Store> {
        private final Store update;
        public StoreUpdate(Store update){
            this.update = update;
        }

        @Override
        public Store apply(Store t) {
            if(t == null) {
                t = new Store();
            }

            t.name = update.name;
            t.address = update.address;
            return t;
        }
    }

    private static RiakCluster setUpCluster()  {
        RiakNode node = new RiakNode.Builder()
                .withRemoteAddress("127.0.0.1")
                .withRemotePort(8087)
                .build();

        RiakCluster cluster = new RiakCluster.Builder(node)
                .build();

        cluster.start();

        return cluster;
    }

    public static void main( String[] args ) {
        try {
            BasicConfigurator.configure();
            RiakCluster cluster = setUpCluster();
            RiakClient client = new RiakClient(cluster);
            System.out.println("------------------ Client object successfully created");

            Store zabka = new Store();
            zabka.name = "Zabka";
            zabka.address = "Matolkowa 12";
            System.out.println("------------------ Store object created "+zabka.toString());

            // wrzuci do bazy dokument
            Namespace storeBucket = new Namespace("s19515");
            Location zabkaLocation = new Location(storeBucket, "zabka");
            StoreValue storeStore = new StoreValue.Builder(zabka)
                    .withLocation(zabkaLocation)
                    .build();
            client.execute(storeStore);
            System.out.println("------------------ Zabka information now stored in Riak "+storeStore.toString());

            // pobierze go i wypisze
            FetchValue fetchZabka = new FetchValue.Builder(zabkaLocation)
                    .build();
            Store fetchedStore = client.execute(fetchZabka).getValue(Store.class);
            System.out.println("------------------ Store object successfully fetched "+fetchedStore.toString());

            // zmodyfikuje go
            zabka.address = "Kolorowa 111";
            StoreUpdate updatedStore = new StoreUpdate(zabka);
            UpdateValue updateValue = new UpdateValue.Builder(zabkaLocation)
                    .withUpdate(updatedStore).build();
            UpdateValue.Response response = client.execute(updateValue);
            System.out.println(response.wasUpdated());
            // pobierze go i wypisze
            fetchZabka = new FetchValue.Builder(zabkaLocation)
                    .build();

            fetchedStore = client.execute(fetchZabka).getValue(Store.class);
            System.out.println("------------------ After update "+fetchedStore.toString());

            //usunie go
            DeleteValue deleteOp = new DeleteValue.Builder(zabkaLocation)
                    .build();
            client.execute(deleteOp);

            //i spróbuje pobrać z bazy
            fetchZabka = new FetchValue.Builder(zabkaLocation)
                    .build();
            fetchedStore = client.execute(fetchZabka).getValue(Store.class);
            System.out.println("-------------After delete "+fetchedStore);

            cluster.shutdown();

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}