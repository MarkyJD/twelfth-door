import { useEffect } from 'react';

export default function Jobs() {
  useEffect(() => {
    document.title = 'Twelfth Door | Jobs';
  }, []);

  return (
    <div>
      <header>
        <h1 className="font-serif">Jobs Page</h1>
      </header>
      <hr />
      <article className="max-w-screen-lg mx-auto">
        <p className="columns-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          vestibulum, nulla vel varius pharetra, urna magna tincidunt ante, eget
          convallis arcu nisi et justo. Fusce vel consequat mauris, in posuere
          justo. Mauris mattis malesuada tellus eget tempus. Donec et tristique
          justo, sed lacinia sem. Quisque porta augue lacus, ac mollis quam
          dictum in. Maecenas eros sem, luctus sit amet volutpat ut, dapibus nec
          dolor. Maecenas risus orci, sodales id sodales eu, pretium eu elit.
          Cras suscipit dolor a mi bibendum, lacinia faucibus mi commodo. In
          aliquam mollis fringilla. Duis consectetur sed magna auctor gravida.
          Nulla facilisi. Mauris pulvinar leo eu lectus tempor, sit amet
          venenatis urna semper. Nulla facilisi. Nulla facilisi. Cras gravida
          pulvinar tellus, vel feugiat nibh. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Mauris et risus vitae sapien sagittis pulvinar. Maecenas
          lacinia sem vestibulum vulputate vestibulum. Praesent sed nisi metus.
          In vel lorem massa. Nulla facilisi. Vivamus semper felis mi, id varius
          risus consequat ut. Sed tincidunt feugiat placerat. Aliquam vitae
          fringilla tellus. Nullam mollis erat tempus diam congue elementum. Ut
          eu lacus felis. Phasellus vestibulum mauris ac elit ornare, ac aliquam
          lectus consectetur. Etiam malesuada lorem erat, et laoreet massa
          malesuada sit amet. Nulla turpis mi, porta ac rhoncus non, lobortis
          sit amet leo. Aenean iaculis, lacus eget aliquet gravida, ante sem
          pellentesque enim, imperdiet sagittis sem turpis quis justo. Donec
          eget diam massa. Nulla non volutpat tellus, quis varius risus. Nunc
          ultricies, erat eget iaculis sagittis, est erat finibus ante, ac
          gravida dolor justo in sapien. Integer fringilla nisl nulla, quis
          gravida urna iaculis id. Vestibulum dignissim fringilla arcu vel
          aliquet. Nullam ultricies iaculis lectus at pharetra. Quisque auctor
          risus ut pharetra aliquet. Quisque scelerisque at nulla et iaculis.
          Vivamus at egestas metus, a laoreet arcu. Quisque pharetra ligula sit
          amet ante efficitur, eget commodo neque ullamcorper. Proin congue,
          turpis nec convallis imperdiet, urna erat sodales lorem, non euismod
          leo diam eu ligula. Praesent porta varius ipsum et venenatis. Fusce
          vitae accumsan velit. In id eros tempus, posuere nulla id, molestie
          tellus. Sed at varius enim, et elementum nibh. Ut ultricies blandit
          odio, vel dapibus est rutrum sit amet. Sed facilisis molestie arcu.
          Nullam nec eros in nunc convallis mattis. Proin mattis a turpis quis
          ullamcorper. Proin at nibh vel tellus dignissim tincidunt. Morbi quis
          nisl pharetra, sollicitudin sapien sit amet, ornare eros. Maecenas
          blandit sapien maximus libero tincidunt ullamcorper. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Integer eu neque dignissim leo tristique vehicula ut euismod leo.
          Aenean vestibulum rutrum tortor sed pulvinar. Aliquam tortor arcu,
          tempus non luctus tincidunt, aliquam vitae enim. Sed dapibus risus vel
          malesuada aliquet. Pellentesque sagittis congue cursus. Vestibulum
          lectus nulla, fermentum id facilisis a, pellentesque ornare ipsum.
          Nulla varius semper mauris, vitae accumsan ipsum sodales sodales.
        </p>
      </article>
    </div>
  );
}
